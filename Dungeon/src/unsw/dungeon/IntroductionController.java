package unsw.dungeon;

import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.input.KeyEvent;

public class IntroductionController {
	private ChallengeMenu menu;
	
	@FXML
	private Button Back;
	public void handleKeyPress(KeyEvent event) {
        switch (event.getCode()) {
        case Q:
        	menu.show();
        default:
            break;
        }
    }

	public void setMenuScreen(ChallengeMenu menu) {
		this.menu = menu;
	}
	@FXML
	public void Back(ActionEvent event) throws IOException {
		menu.show();
	}
	
}
