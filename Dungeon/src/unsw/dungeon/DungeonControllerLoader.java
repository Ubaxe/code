package unsw.dungeon;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.Node;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;

/**
 * A DungeonLoader that also creates the necessary ImageViews for the UI,
 * connects them via listeners to the model, and creates a controller.
 * @author Robert Clifton-Everest
 *
 */
public class DungeonControllerLoader extends DungeonLoader {

    private List<ImageView> entities;
    private List<Integer> doorList;
    private List<Integer> doorId;
    private List<Integer> portalList;
    //Images
    private Image playerImage;
    private Image wallImage;
    private Image boulderImage;
    private Image InvincibilityPotion;
    private Image EnemeyImage;
    private Image ExitImage;
    private Image GoldImage;
    private Image SwordImage;
    private Image YellowKeyImage;
    private Image RedPortal;
    private Image RedKeyImage;
    private Image YellowDoorImage;
    private Image BlueDoorImage;
    private Image BlueKeyImage;
    private Image RedDoorImage;
    private Image DoorOpenImage;
    private Image PortalImage;
    private Image FloorSwitchImage;
    private Image BigEnemyImage;
    public DungeonControllerLoader(String filename)
            throws FileNotFoundException {
        super(filename);
        doorList = new ArrayList<>();
        doorId = new ArrayList<>();
        entities = new ArrayList<>();
        portalList = new ArrayList<>();
        playerImage = new Image("/human_new.png");
        wallImage = new Image("/brick_brown_0.png");
        boulderImage = new Image("/boulder.png");
        InvincibilityPotion	= new Image("/brilliant_blue_new.png");
        EnemeyImage = new Image("/deep_elf_master_archer.png");
        ExitImage = new Image("/exit.png");
        GoldImage = new Image("/gold_pile.png");
        SwordImage = new Image("/greatsword_1_new.png");
        YellowKeyImage = new Image("/key.png");
        RedKeyImage = new Image("/Redkey.png");
        DoorOpenImage = new Image("/open_door.png");
        RedDoorImage = new Image("/closed_door_red.png");
        YellowDoorImage = new Image("/closed_door.png");
        PortalImage = new Image("/portal.png");
        RedPortal = new Image("/redportal.png");
        FloorSwitchImage = new Image("/pressure_plate.png");
        BigEnemyImage = new Image("/BigEnemy.png");
        BlueDoorImage = new Image("/closed_door_copy_blue.png");
        BlueKeyImage = new Image("key_blue.png");
    }

    @Override
    public void onLoad(Entity player) {
        ImageView view = new ImageView(playerImage);
        addEntity(player, view);
    }

    @Override
    public void onLoad(Wall wall) {
        ImageView view = new ImageView(wallImage);
        addEntity(wall, view);
    }
    
	@Override
	public void onLoad(Treasure treasure) {
		ImageView view = new ImageView(GoldImage);
        addEntity(treasure, view);
	}

	@Override
	public void onLoad(Exit exit) {
		ImageView view = new ImageView(ExitImage);
        addEntity(exit, view);
	}

	@Override
	public void onLoad(FloorSwitch floorSwitch) {
		ImageView view = new ImageView(FloorSwitchImage);
        addEntity(floorSwitch, view);
	}

	@Override
	public void onLoad(Boulder boulder) {
		ImageView view = new ImageView(boulderImage);
        addEntity(boulder, view);
		
	}

	@Override
	public void onLoad(Sword sword) {
		ImageView view = new ImageView(SwordImage);
        addEntity(sword, view);
	}

	@Override
	public void onLoad(Enemy enemy) {
		ImageView view = new ImageView(EnemeyImage);
        addEntity(enemy, view);
		
	}
    @Override
    public void onLoad(BigEnemy enemy) {
        ImageView view = new ImageView(BigEnemyImage);
        addEntity(enemy, view);
    }

	@Override
	public void onLoad(InvincibilityPotion potion) {
		ImageView view = new ImageView(InvincibilityPotion);
        addEntity(potion, view);
	}

	@Override
	public void onLoad(Key key) {
        int color = key.getColor();
        if (!doorList.contains(color)) {
			doorList.add(color);
        }
        int num = doorList.indexOf(color);
		if (num == 1) {
			ImageView view = new ImageView(YellowKeyImage);
	        addEntity(key, view);
		} else if (num == 0) {
			ImageView view = new ImageView(RedKeyImage);
	        addEntity(key, view);
		} else {
			ImageView view = new ImageView(BlueKeyImage);
	        addEntity(key, view);
		}

	}

	@Override
	public void onLoad(Door door) {
		int color = door.getColor();
		if (!doorList.contains(color)) {
			doorList.add(color);
        }
		int num = doorList.indexOf(color);
		if (num == 1) {
			ImageView view = new ImageView(DoorOpenImage);
	        addEntity(door, view);
			view = new ImageView(YellowDoorImage);
	        addEntity(door, view);
		} else if (num == 0) {
			ImageView view = new ImageView(DoorOpenImage);
	        addEntity(door, view);
	        ImageView view1 = new ImageView(RedDoorImage);
	        addEntity(door, view1);
		} else {
			ImageView view = new ImageView(DoorOpenImage);
	        addEntity(door, view);
	        ImageView view1 = new ImageView(BlueDoorImage);
	        addEntity(door, view1);
		}

	}
	
	@Override
	public void onLoad(AlwaysOpenDoor door) {
		int color = door.getColor();
		ImageView view = new ImageView(DoorOpenImage);
        addEntity(door, view);
	}
	
	

	@Override
	public void onLoad(Portal portal) {
        int color = portal.getColor();
        if (!portalList.contains(color)) {
        	portalList.add(color);
        }
        int num = portalList.indexOf(color);
		if (num == 1) {
			ImageView view = new ImageView(RedPortal);
	        addEntity(portal, view);
		} else if (num == 0) {
			ImageView view = new ImageView(PortalImage);
	        addEntity(portal, view);
		} 
	}
    

    private void addEntity(Entity entity, ImageView view) {
        trackPosition(entity, view);
        entities.add(view);
    }

    /**
     * Set a node in a GridPane to have its position track the position of an
     * entity in the dungeon.
     *
     * By connecting the model with the view in this way, the model requires no
     * knowledge of the view and changes to the position of entities in the
     * model will automatically be reflected in the view.
     * @param entity
     * @param node
     */
    private void trackPosition(Entity entity, Node node) {
        GridPane.setColumnIndex(node, entity.getX());
        GridPane.setRowIndex(node, entity.getY());
        entity.x().addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observable,
                    Number oldValue, Number newValue) {
                GridPane.setColumnIndex(node, newValue.intValue());
            }
        });
        entity.y().addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observable,
                    Number oldValue, Number newValue) {
                GridPane.setRowIndex(node, newValue.intValue());
            }
        });
    }

    /**
     * Create a controller that can be attached to the DungeonView with all the
     * loaded entities.
     * @return
     * @throws FileNotFoundException
     */
    public DungeonController loadController() throws FileNotFoundException {
        return new DungeonController(load(), entities);
    }



}
