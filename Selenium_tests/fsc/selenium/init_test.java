package fsc.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class init_test {

	public static void main(String[] args) {
		WebDriver driver = new FirefoxDriver();
		System.out.println("Test");
		driver.get("http://localhost:3000/login");
		driver.findElement(By.id("email")).sendKeys("mithun@amrita.com");
		driver.findElement(By.id("password")).sendKeys("amrita");
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

}
