package edu.sdu.chatroom.entity;

public class Room {

	private int id;

	private String title;

	private int capacity;

	private int currentSize;

	private String password;

	public Room() {
	}

	public Room(String title, int capacity) {
		this.title = title;
		this.capacity = capacity;
		this.currentSize = 0;
		this.password = "";
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getCurrentSize() {
		return currentSize;
	}

	public void setCurrentSize(int currentSize) {
		this.currentSize = currentSize;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
