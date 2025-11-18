package com.usuarios_resena.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.usuarios_resena.models.dto.SentimentResponse;




@Service
public class SentimentAnalysisService {

    @Autowired
    private RestTemplate restTemplate;

    private final String pythonApiUrl = "http://localhost:5000/analyze";

    public SentimentResponse analyze(String text) {
        // Creamos el cuerpo de la petición
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", text);

        // Realizamos la llamada a la API de Python
        return restTemplate.postForObject(pythonApiUrl, requestBody, SentimentResponse.class);
    }
}

