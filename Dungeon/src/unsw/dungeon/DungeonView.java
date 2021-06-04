package unsw.dungeon;

import java.io.IOException;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class DungeonView {
	private String title;
	private String path;
	private Scene scene;
	private Stage stage;
	private DungeonController controller;
	
	public DungeonView(Stage stage, String title, String path) throws IOException{
		this.stage = stage;
		this.title = title;
		this.path = path;
		DungeonControllerLoader dungeonLoader = new DungeonControllerLoader(path);
		controller = dungeonLoader.loadController();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("DungeonView.fxml"));
        loader.setController(controller);
        Parent root = loader.load();
        scene = new Scene(root);
        root.requestFocus();
	}
	

	public void show() {
		stage.setTitle(this.title);
		stage.setScene(scene);
		stage.show();
	}
	
	public String getPath() {
		return this.path;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public Stage getStage() {
		return this.stage;
	}
	
	public DungeonController getController() {
		return this.controller;
	}
	
}
