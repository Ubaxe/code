package unsw.dungeon;

import java.io.IOException;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Successful {
	private String title;
	private Scene scene;
	private Stage stage;
	private SucceessfulController controller;
	public Successful(Stage stage, String title) throws IOException{
		this.stage = stage;
		this.title = title;
		this.controller = new SucceessfulController();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("Successful.fxml"));
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

	
	public String getTitle() {
		return this.title;
	}
	
	public Stage getStage() {
		return this.stage;
	}
	
	public SucceessfulController getController() {
		return this.controller;
	}
	
}


