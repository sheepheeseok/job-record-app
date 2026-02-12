package com.jobrecord.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAIClient {

    @Value("${openai.api-key}")
    private String apiKey;

    private final ObjectMapper objectMapper;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public String ask(String prompt) {

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-4o-mini",
                    "messages", List.of(
                            Map.of("role", "system",
                                    "content", "너는 취업 준비 활동을 분석하는 커리어 코치다."),
                            Map.of("role", "user",
                                    "content", prompt)
                    ),
                    "temperature", 0.7
            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(OPENAI_URL, entity, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            return root.get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();

        } catch (Exception e) {
            throw new RuntimeException("OpenAI 호출 실패", e);
        }
    }
}
