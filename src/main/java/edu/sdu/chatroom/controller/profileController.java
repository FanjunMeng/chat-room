package edu.sdu.chatroom.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.sdu.chatroom.entity.User;
import edu.sdu.chatroom.service.UserService;

@RestController
public class profileController {

	private static double WIDTH = 600;

	@Autowired
	private UserService userService;

	private Map<String, String> nameIconPathMap = new ConcurrentHashMap<String, String>();

	@RequestMapping(value = "/iconUpload", method = RequestMethod.POST)
	public String handleFormUpload(HttpServletRequest request, String name,
			MultipartFile file) throws IOException {
		if (!file.isEmpty()) {
			String rootPath = request.getSession().getServletContext()
					.getRealPath("/");

			String fileName = file.getOriginalFilename();
			fileName = System.currentTimeMillis()
					+ fileName.substring(fileName.lastIndexOf('.'),
							fileName.length());
			String filePath = rootPath + fileName;
			File icon = new File(filePath);
			file.transferTo(icon);

			nameIconPathMap.put(name, filePath);
			return fileName;
		}
		return "";
	}

	@RequestMapping(value = "/cutIcon", method = RequestMethod.POST)
	public String cutIcon(String name, int x, int y, int w, int h)
			throws IOException {

		String sourcePath = nameIconPathMap.get(name);
		String format = sourcePath.substring(sourcePath.lastIndexOf(".") + 1,
				sourcePath.length());

		File icon = new File(sourcePath);
		BufferedImage image = ImageIO.read(icon);
		double proportion = WIDTH / image.getWidth();
		int x2 = (int) (x / proportion);
		int y2 = (int) (y / proportion);
		int w2 = (int) (w / proportion);
		int h2 = (int) (w / proportion);
		image = image.getSubimage(x2, y2, w2, h2);

		String targetName = System.currentTimeMillis() + "." + format;
		String targetPath = sourcePath.substring(0,
				sourcePath.lastIndexOf("\\"))
				+ "\\" + targetName;
		ImageIO.write(image, format, new File(targetPath));

		userService.updateIconPathByName(name, targetName);
		return "success";
	}

	@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
	public String changePassword(String name, String oldPassword,
			String newPassword) {
		User user = userService.findByName(name);
		if (!user.getPassword().equals(oldPassword)) {
			return "error";
		}
		userService.updatePasswordByName(name, newPassword);
		return "success";
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
