package unsw.dungeon;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.SplitPane;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import unsw.dungeon.goal.*;
/**
 * A JavaFX controller for the dungeon.
 * @author Robert Clifton-Everest
 *
 */
public class DungeonController {


    @FXML
    private GridPane squares;

    @FXML
    private Label Hit;
    
    @FXML
    private Label State;
    
    @FXML
    private Label Goal;
    
    @FXML
    private Label Goal1;
    
    private List<ImageView> initialEntities;

    private Player player;

    private Dungeon dungeon;

    private DungeonView dungeonview;
    
    private ChallengeMenu challengeMenu;
    
    private GameOver gameover;
	
    private Successful success;
    
    public DungeonController(Dungeon dungeon, List<ImageView> initialEntities) {
        this.dungeon = dungeon;
        this.player = dungeon.getPlayer();
        this.initialEntities = new ArrayList<>(initialEntities);
    }

    @FXML
    public void initialize() {
        Image ground = new Image("/dirt_0_new.png");

        // Add the ground first so it is below all other entities
        for (int x = 0; x < dungeon.getWidth(); x++) {
            for (int y = 0; y < dungeon.getHeight(); y++) {
                squares.add(new ImageView(ground), x, y);
            }
        }

        for (ImageView entity : initialEntities)
            squares.getChildren().add(entity);
        Hit.setText("0");
        State.setText("NormalState");
    }

    @FXML
    public void handleKeyPress(KeyEvent event) throws IOException {
    	Goal.setText(dungeon.GetGoalkey());
    	Goal1.setText(dungeon.GetGoalString());
        switch (event.getCode()) {
        case UP:
            List<Entity> entities = dungeon.getEntity(player.getX(), player.getY() - 1);
            for (Entity e: entities) {
            	player.playerPushBoulder(dungeon, player, e, "Up");
            	player.playerOpen(dungeon, player, e, "Up");
            }
            player.playerMove(dungeon, player, null, "Up");
            break;
        case DOWN:
            entities = dungeon.getEntity(player.getX(), player.getY() + 1);
            for (Entity e: entities) {
            	player.playerPushBoulder(dungeon, player, e, "Down");
            	player.playerOpen(dungeon, player, e, "Down");
            }
            player.playerMove(dungeon, player, null, "Down");
            break;
        case LEFT:
        	entities = dungeon.getEntity(player.getX() - 1, player.getY());
            for (Entity e: entities) {
            	player.playerPushBoulder(dungeon, player, e, "Left");
            	player.playerOpen(dungeon, player, e, "Left");
            }
            player.playerMove(dungeon, player, null, "Left");
            break;
        case RIGHT:
        	entities = dungeon.getEntity(player.getX() + 1, player.getY());
            for (Entity e: entities) {
            	player.playerPushBoulder(dungeon, player, e, "Right");
            	player.playerOpen(dungeon, player, e, "Right");
            }
            player.playerMove(dungeon, player, null, "Right");
            break;
        case Q:
        	challengeMenu.show();
        	break;
        case R:
        	DungeonView dungeonScreen = new DungeonView(dungeonview.getStage(), dungeonview.getTitle(), dungeonview.getPath());
        	dungeonScreen.getController().setScreen(dungeonScreen);
        	dungeonScreen.getController().setGameOver(gameover);
        	dungeonScreen.getController().setSuccess(success);
        	dungeonScreen.getController().setMenuScreen(challengeMenu);
        	dungeonScreen.show();
        	break;
        default:
            break;
        }
        if (dungeon.CountBoulder() != dungeon.BoulderInCorner()) {
        	gameover.show();
    		return;
        }
        AllGoal goals = (AllGoal) dungeon.getAllGoals();
        if (goals.isSatisfied(dungeon)) {
        	success.show();
        	return;
        } else if (player.getPlayerState() instanceof GameOverState) {
    		gameover.show();
    		return;
    	}
        if (player.getSword() != null) {
        	int gethit = player.getSword().getHit();
        	String hit = String.valueOf(gethit);
        	Hit.setText(hit);
        } else if (player.getSword() == null){
        	Hit.setText("0");
        }
        
        if (player.getPlayerState() instanceof InvincibleState) {
        	State.setText("InvincibleState");
        } else if (player.getPlayerState() instanceof NormalState) {
        	State.setText("NormalState");
        }
        
    }
    
	public void setScreen(DungeonView dungeonview) {
		this.dungeonview = dungeonview;
	}
	
	public void setMenuScreen(ChallengeMenu challengeMenu) {
		this.challengeMenu = challengeMenu;
	}

	public void setGameOver(GameOver gameover) {
		this.gameover = gameover;
	}
	
	public void setSuccess(Successful successful) {
		this.success = successful;
	}
	
}

