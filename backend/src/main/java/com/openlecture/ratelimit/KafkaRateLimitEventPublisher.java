package com.openlecture.ratelimit;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/** Publishes blocked requests for monitoring when Kafka is configured. */
@Component
@ConditionalOnProperty(prefix = "app.rate-limit.kafka", name = "enabled", havingValue = "true")
public class KafkaRateLimitEventPublisher implements RateLimitEventPublisher {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaRateLimitEventPublisher.class);

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private final RateLimitKafkaProperties properties;

    public KafkaRateLimitEventPublisher(
            KafkaTemplate<String, String> kafkaTemplate,
            ObjectMapper objectMapper,
            RateLimitKafkaProperties properties) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
        this.properties = properties;
    }

    @Override
    public void publish(String clientIp, String path, String method, int limit) {
        try {
            String payload = objectMapper.writeValueAsString(new RateLimitEvent(
                    clientIp, path, method, limit, Instant.now().toString()));
            kafkaTemplate.send(properties.getTopic(), clientIp, payload)
                    .whenComplete((result, error) -> {
                        if (error != null) {
                            LOGGER.warn("Unable to publish rate-limit event", error);
                        }
                    });
        } catch (JsonProcessingException error) {
            LOGGER.warn("Unable to serialize rate-limit event", error);
        }
    }

    private record RateLimitEvent(String clientIp, String path, String method, int limit, String occurredAt) { }
}
