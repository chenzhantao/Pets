package com.ssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class UserController {
	
	@RequestMapping("/login")
	public String login() {
		System.out.println("kdkdkdkkdkdkkdkd");
		return "index";//在springmvc中的视图解析器里面配置了前缀和后缀
	}
}
