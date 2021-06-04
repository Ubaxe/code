package unsw.dungeon;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import unsw.dungeon.goal.*;
/**
 * Loads a dungeon from a .json file.
 *
 * By extending this class, a subclass can hook into entity creation. This is
 * useful for creating UI elements with corresponding entities.
 *
 * @author Robert Clifton-Everest
 *
 */
public abstract class DungeonLoader {

    private JSONObject json;
    public DungeonLoader(String filename) throws FileNotFoundException {
        json = new JSONObject(new JSONTokener(new FileReader("dungeons/" + filename)));
    }

    /**
     * Parses the JSON to create a dungeon.
     * @return
     */
    public Dungeon load() {
        int width = json.getInt("width");
        int height = json.getInt("height");
        Dungeon dungeon = new Dungeon(width, height);
        JSONArray jsonEntities = json.getJSONArray("entities");
        for (int i = 0; i < jsonEntities.length(); i++) {
            loadEntity(dungeon, jsonEntities.getJSONObject(i));
        }
        
        JSONObject jsonConditions = json.getJSONObject("goal-condition");
        String Condition1 = jsonConditions.getString("goal");
        String Subgoals = "";
        if (Condition1.equals("AND") || Condition1.equals("OR")) {
        	Subgoals = jsonConditions.getJSONArray("subgoals").toString();
        	dungeon.SetGoalString(Subgoals);
        }
        dungeon.SetGoalkey(Condition1);
        AllGoal allGoal = (AllGoal) loadGoals(jsonConditions, dungeon);
        dungeon.setAllGoals(allGoal);
        return dungeon;
    }

    private void loadEntity(Dungeon dungeon, JSONObject json) {
        String type = json.getString("type");
        int x = json.getInt("x");
        int y = json.getInt("y");
        int colour;
        Entity entity = null;
        switch (type) {
        case "player":
            Player player = new Player(dungeon, x, y);
            dungeon.setPlayer(player);
            onLoad(player);
            entity = player;
            break;
        case "wall":
            Wall wall = new Wall(x, y);
            onLoad(wall);
            entity = wall;
            break;
        case "treasure":
        	Treasure treasure = new Treasure(x, y);
        	onLoad(treasure);
        	entity = treasure;
        	break;
	    case "exit":
	    	Exit exit = new Exit(x, y);
	    	onLoad(exit);
	    	entity = exit;
	    	break;
		case "boulder":
			Boulder boulder = new Boulder(x, y);
			onLoad(boulder);
			entity = boulder;
			break;
		case "switch":
			FloorSwitch floorswitch = new FloorSwitch(x, y);
			onLoad(floorswitch);
			entity = floorswitch;
			break;
		case "sword":
			Sword sword = new Sword(x, y);
			onLoad(sword);
			entity = sword;
			break;
		case "enemy":
			Enemy enemy = new Enemy(dungeon, x, y);
			onLoad(enemy);
			entity = enemy;
			break;
		case "Bigenemy":
			BigEnemy Bigenemy = new BigEnemy(dungeon, x, y);
			onLoad(Bigenemy);
			entity = Bigenemy;
			break;
		case "invincibility":
			InvincibilityPotion potion = new InvincibilityPotion(x, y);
			onLoad(potion);
			entity = potion;
			break;
		case "key":
			colour = json.getInt("id");
			Key key = new Key(x, y, colour);
			onLoad(key);
			entity = key;
			break;
		case "door":
			colour = json.getInt("id");
			AlwaysOpenDoor d = new AlwaysOpenDoor(x, y, colour);
			onLoad(d);
			entity = d;
			Door door = new Door(x, y, colour);
			onLoad(door);
			entity = door;
			break;
		case "portal":
			colour = json.getInt("id");
			Portal portal = new Portal(x, y, colour);
			onLoad(portal);
			entity = portal;
			break;
		}
        dungeon.addEntity(entity);
    }
    
    private Goal loadGoals(JSONObject jsonConditions, Dungeon dungeon) {
    	AllGoal result = new AllGoal();
		String type = jsonConditions.getString("goal");
		switch(type) {
			case "AND":
				AndGoal andGoals = new AndGoal();
				JSONArray jsonAnd = jsonConditions.getJSONArray("subgoals");
		        for (int i = 0; i < jsonAnd.length(); i++) {
		            andGoals.addGoal(loadGoals(jsonAnd.getJSONObject(i), dungeon));
		        }
		        result.addGoal(andGoals);
		        break;
			case "OR":
				OrGoal orGoals = new OrGoal();
				JSONArray jsonOr = jsonConditions.getJSONArray("subgoals");
		        for (int i = 0; i < jsonOr.length(); i++) {
		            orGoals.addGoal(loadGoals(jsonOr.getJSONObject(i), dungeon));
		        }
		        result.addGoal(orGoals);
		        break;
			case "exit":
				ExitGoal exit = new ExitGoal();
				result.addGoal(exit);
				break;
			case "treasure":
				TreasureGoal t = new TreasureGoal();
				result.addGoal(t);
				break;
			case "enemies":
				KillEnemyGoal k = new KillEnemyGoal();
				result.addGoal(k);
				break;
			case "boulders":
				FloorSwitchGoal f = new FloorSwitchGoal();
				result.addGoal(f);
				break;
			default:
				break;
		}
    	return result;
    }

    public abstract void onLoad(Entity player);

    public abstract void onLoad(Wall wall);
    
    public abstract void onLoad(Treasure treasure);
    
    public abstract void onLoad(Exit exit);
    
    public abstract void onLoad(FloorSwitch floorSwitch);
    
    public abstract void onLoad(Boulder boulder);
    
    public abstract void onLoad(Sword sword);
    
    public abstract void onLoad(Enemy enemy);
    
    public abstract void onLoad(InvincibilityPotion potion);
    
    public abstract void onLoad(Key key);
    
    public abstract void onLoad(Door door);
    
    public abstract void onLoad(Portal portal);
    
    public abstract void onLoad(AlwaysOpenDoor d);

	public abstract void onLoad(BigEnemy enemy);


}
