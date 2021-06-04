package unsw.dungeon;
import java.util.List;
import java.util.Observable;
import java.util.Observer;
/**
 * The player entity
 * @author Robert Clifton-Everest
 *
 */
public class Player extends Entity implements Observer {

    private Dungeon dungeon;
    private PlayerState playerState;
    private Sword sword;
    private Key key;
    private Action action;
    /**
     * Create a player positioned in square (x,y)
     * @param x
     * @param y
     */

    
    public Player(Dungeon dungeon, int x, int y) {
        super(x, y);
        this.dungeon = dungeon;
        this.playerState = new NormalState();
        this.setSword(null);
        this.setKey(null);
    }

	public void setAction(Action action) {
		this.action = action;
	}


	public PlayerState getPlayerState() {
		return playerState;
	}

	public void setPlayerState(PlayerState playerState) {
		this.playerState = playerState;
	}
	
	public Sword getSword() {
		return sword;
	}

	public void setSword(Sword sword) {
		this.sword = sword;
	}
	
	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}
	
    public void moveUp() {
        if (getY() > 0) {
            y().set(getY() - 1);
        }
    }

    public void moveDown() {
        if (getY() < dungeon.getHeight() - 1)
            y().set(getY() + 1);
    }

    public void moveLeft() {
        if (getX() > 0)
            x().set(getX() - 1);
    }

    public void moveRight() {
        if (getX() < dungeon.getWidth() - 1)
            x().set(getX() + 1);
    }
    
    public boolean winEnemy() {
    	boolean result = false;
    	if (playerState instanceof NormalState) {
    		if (this.sword != null) {
    			sword.reduceHit();
    			if (sword.getHit() == 0) {
    				setSword(null);
    			}
    			result = true;
    		}
    	} else if (playerState instanceof InvincibleState) {
    		result = true;
    	} else if (playerState instanceof GameOverState) {
    		
    	}
    	return result;
    }

    public void playerPushBoulder(Dungeon dungeon, Player player,Entity entity, String dire) {
    	setAction(new Push());
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerMove(Dungeon dungeon, Player player,Entity entity, String dire) {
    	Move move = new Move();
    	move.addObserver(this);
    	setAction(move);
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerTransfer(Dungeon dungeon, Player player,Entity entity, String dire) {
    	setAction(new Transfer());
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerOpen(Dungeon dungeon, Player player,Entity entity, String dire) {
    	setAction(new Open());
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerPick(Dungeon dungeon, Player player,Entity entity, String dire) {
    	setAction(new Pick());
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerBattle(Dungeon dungeon, Player player,Entity entity, String dire) {
    	setAction(new Battle());
    	action.action(dungeon, player, entity, dire);
    }
    
    public void playerEnemy(Dungeon dungeon, Player player, Entity entity, String dire) {
    	setAction(new EnemyMove());
    	action.action(dungeon, player, entity, dire);
    }

    public void playerExitGame(Dungeon dungeon, Player player, Entity entity, String dire) {
    	setAction(new ExitGame());
    	action.action(dungeon, player, entity, dire);
    }
    
    
	@Override
	public void update(Observable o, Object arg) {
		List<Entity> entities = dungeon.getEntity(this.getX(), this.getY());
		
		for (Entity e: entities) {
			playerExitGame(this.dungeon,this,e,null);
		}

		for (Entity e: entities) {
			playerPick(this.dungeon, this, e, null);
		}
		for (Entity e: entities) {
			playerTransfer(this.dungeon, this, e, null);
		}
		// all enemy react to the move of player
		for (Entity e: entities) {
			playerBattle(this.dungeon, this, e, null);
		}
		
		
		playerEnemy(this.dungeon, this, null, null);
		// do battle another time if a new enemy moves here
		entities = dungeon.getEntity(this.getX(), this.getY());
		for (Entity e: entities) {
			playerBattle(this.dungeon, this, e, null);
		}
	}
    
    

}
