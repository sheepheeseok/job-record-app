package com.jobrecord.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobrecord.backend.dto.activity.AIAnalysisResponse;
import com.jobrecord.backend.dto.activity.AnalysisSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalysisAIService {

    private final OpenAIClient openAIClient;
    private final ObjectMapper objectMapper;

    public AIAnalysisResponse generateAnalysisComment(
            AnalysisSummaryResponse summary
    ) {

        String prompt = buildPrompt(summary);

        String aiText = openAIClient.ask(prompt);

        return parseResponse(aiText);
    }

    private String buildPrompt(AnalysisSummaryResponse s) {
        return """
        아래는 취업 준비 사용자의 활동 통계다.

        성향: %s
        총 활동 시간: %d시간
        활동 일수: %d일
        완료 비율: %.1f%%
        꾸준함 점수: %.1f점

        반드시 아래 JSON 형식으로만 응답하라.
        다른 설명은 절대 포함하지 마라.

        {
          "summary": "2~3문장 요약",
          "feedback": "1~2문장 피드백",
          "recommendation": "이번 주 행동 1가지"
        }
        """.formatted(
                s.getTendencyType(),
                s.getTotalHours(),
                s.getActiveDays(),
                s.getCompletionRatio(),
                s.getConsistencyScore()
        );
    }

    private AIAnalysisResponse parseResponse(String aiText) {
        try {
            return objectMapper.readValue(aiText, AIAnalysisResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("AI 응답 파싱 실패", e);
        }
    }
}
