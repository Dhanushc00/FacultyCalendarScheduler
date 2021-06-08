package fsc.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class user_login {
	static WebDriver driver = new FirefoxDriver();
	public static void main(String[] args) {
		test3();
	}
	public static void test1() {
		System.out.println("Test with non-existing user");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("mithun@amrita.com");
		driver.findElement(By.id("password")).sendKeys("123");
		Select sel = new Select(driver.findElement(By.id("role")));
		sel.selectByVisibleText("Admin");
		driver.findElement(By.id("submit")).click();
		if(driver.findElement(By.id("chakra-toast-manager-bottom")).getText().contains("Login Failure")) {
			System.out.println("passed");
		}
		else {
			System.out.println("failed");
		}
	}
	public static void test2() {
		System.out.println("Test with existing user as admin");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("admin@admin.com");
		driver.findElement(By.id("password")).sendKeys("123");
		Select sel = new Select(driver.findElement(By.id("role")));
		sel.selectByVisibleText("Admin");
		driver.findElement(By.id("submit")).click();
		if(driver. getCurrentUrl().contains("/protected")) {
			System.out.println("passed");
		}
		else {
			System.out.println("failed");
		}
	}
	public static void test3() {
		System.out.println("Test with existing user as faculty");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("mithun@amrita.com");
		driver.findElement(By.id("password")).sendKeys("123");
		Select sel = new Select(driver.findElement(By.id("role")));
		sel.selectByVisibleText("Faculty");
		driver.findElement(By.id("submit")).click();
		if(driver. getCurrentUrl().contains("/protected")) {
			System.out.println("passed");
		}
		else {
			System.out.println("failed");
		}
	}
	public static void test4() {
		System.out.println("Test with existing user and a wrong password");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("mithun@amrita.com");
		driver.findElement(By.id("password")).sendKeys("1235");
		Select sel = new Select(driver.findElement(By.id("role")));
		sel.selectByVisibleText("Faculty");
		driver.findElement(By.id("submit")).click();
		if(driver.findElement(By.id("chakra-toast-manager-bottom")).getText().contains("Login Failure")) {
			System.out.println("passed");
		}
		else {
			System.out.println("failed");
		}
	}
	public static void test5() {
		System.out.println("Test with existing user and a wrong email");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("mithun2@amrita.com");
		driver.findElement(By.id("password")).sendKeys("123");
		Select sel = new Select(driver.findElement(By.id("role")));
		sel.selectByVisibleText("Faculty");
		driver.findElement(By.id("submit")).click();
		if(driver.findElement(By.id("chakra-toast-manager-bottom")).getText().contains("Cannot read property")) {
			System.out.println("passed");
		}
		else {
			System.out.println("failed");
		}
	}

}
