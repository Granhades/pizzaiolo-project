package com.restaurant.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.restaurant.demo.repository.DishRepository;
import com.restaurant.demo.controller.DishController;

@WebMvcTest(DishController.class)
public class DishControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DishRepository dishRepository;

    @Test
    void getMenu_shouldReturnOk() throws Exception {
        mockMvc.perform(get("/api/menu"))
        .andExpect(status().isOk());
    }

    

}
