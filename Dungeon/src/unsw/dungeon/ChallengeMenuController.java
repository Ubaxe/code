package unsw.dungeon;

import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;

/**
 * A JavaFX controller for the level screen.
 * @author Harvey
 *
 */
public class ChallengeMenuController {

	@FXML
	private Button Exit;
	
	@FXML
	private Button Boulders;
	
	@FXML
	private Button Enemy;
	
	@FXML
	private Button Extension;
	
	@FXML
	private Button Introduction;
	
	@FXML
	private Button Extension2;
	
	@FXML
	private Button Extension3;

	private ChallengeMenu challengeMenu;
	
	private GameOver gameover;
	
	private Successful success;
	
	private Introduction Intro;
	
	@FXML
	public void PlayExit(ActionEvent event) throws IOException {
		String path = "maze.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "EXIT", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}
	
	
	@FXML
	public void PlayBoulders(ActionEvent event) throws IOException {
		String path = "boulders.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "Push Boulders", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}
	
	@FXML
	public void PlayKillEnemy(ActionEvent event) throws IOException {
		String path = "advanced.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "Kill Enemy", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}

	@FXML
	public void PlayExtension1(ActionEvent event) throws IOException {
		String path = "extension.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "Extension", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}
	@FXML
	public void PlayExtension2(ActionEvent event) throws IOException {
		String path = "extension2.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "Extension2", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}
	
	@FXML
	public void PlayExtension3(ActionEvent event) throws IOException {
		String path = "extension3.json";
    	DungeonView dungeonScreen = new DungeonView(challengeMenu.getStage(), "Extension3", path);
    	dungeonScreen.getController().setScreen(dungeonScreen);
    	dungeonScreen.getController().setGameOver(gameover);
    	dungeonScreen.getController().setSuccess(success);
    	dungeonScreen.getController().setMenuScreen(challengeMenu);
    	dungeonScreen.show();
	}
	
	@FXML
	public void Introduction(ActionEvent event) throws IOException {
    	Introduction Introduction = new Introduction(challengeMenu.getStage(),"Introduction");
    	Introduction.getController().setMenuScreen(challengeMenu);
    	Introduction.show();
	}
	

	public void setScreen(ChallengeMenu challengeMenu) {
		this.challengeMenu = challengeMenu;
	}
	
	public void setIntro(Introduction Intro) {
		this.Intro = Intro;
	}
	
	public void setGameOver(GameOver gameover) {
		this.gameover = gameover;
	}
	
	public void setSuccess (Successful successful) {
		this.success = successful;
	}
	
}
