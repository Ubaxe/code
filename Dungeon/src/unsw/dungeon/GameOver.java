package unsw.dungeon;

import java.io.IOException;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class GameOver {
	private String title;
	private Scene scene;
	private Stage stage;
	private GameOverController controller;
	public GameOver(Stage stage, String title) throws IOException{
		this.stage = stage;
		this.title = title;
		this.controller = new GameOverController();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("GameOver.fxml"));
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
	
	public GameOverController getController() {
		return this.controller;
	}
	
}
