package unsw.dungeon;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class DungeonApplication extends Application {

    @Override
    public void start(Stage primaryStage) throws IOException {
    	ChallengeMenu Menu = new ChallengeMenu(primaryStage,"            Menu");
    	GameOver gameover = new GameOver(primaryStage,"Over");
    	Successful successful = new Successful(primaryStage,"Good");
    	successful.getController().setMenuScreen(Menu);
    	gameover.getController().setMenuScreen(Menu);
    	Menu.getController().setScreen(Menu);
    	Menu.getController().setGameOver(gameover);
    	Menu.getController().setSuccess(successful);
    	Menu.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

}
