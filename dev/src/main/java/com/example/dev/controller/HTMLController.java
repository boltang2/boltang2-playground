package com.example.dev.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/view/html")
@RequiredArgsConstructor
public class HTMLController {

	@GetMapping("/")
	public String toIndex() {
		return "Index";
	}

	@GetMapping("/template.do")
	private String toTemplate() {
		return "template/Template";
	}

	@GetMapping("/get.do")
	private String toHtml(@RequestParam(name = "category", required = false) String category, HttpSession session,
			Model model) {
		String html = "";
		return html;
	}

}
