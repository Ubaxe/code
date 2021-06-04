/**
 *
 */
package unsw.dungeon;

import java.util.ArrayList;
import java.util.List;
import unsw.dungeon.goal.*;
import java.util.regex.*;
/**
 * A dungeon in the interactive dungeon player.
 *
 * A dungeon can contain many entities, each occupy a square. More than one
 * entity can occupy the same square.
 *
 * @author Robert Clifton-Everest
 *
 */
public class Dungeon {

    private int width, height;
    private List<Entity> entities;
    private Player player;
    private Goal allGoals;
    private String goalstring;
    private String goalkey;
    public Dungeon(int width, int height) {
        this.width = width;
        this.height = height;
        this.entities = new ArrayList<>();
        this.player = null;
        this.allGoals = null;
        this.goalstring = null;
        this.goalkey = null;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public void addEntity(Entity entity) {
        entities.add(entity);
    }
    
    public Goal getAllGoals() {
		return allGoals;
	}
    
    public void SetGoalString(String goal) {
    	String regex = "\"goal\":\"(.*?)\"";
    	String r = "";
    	Matcher matcher= Pattern.compile(regex).matcher(goal);
    	while (matcher.find()) {
    		r = matcher.group(1) +"\n"+r;
    	}
    	this.goalstring = r;
	}

    public void SetGoalkey(String goal) {
    	this.goalkey = goal;
	}
	public void setAllGoals(Goal allGoals) {
		this.allGoals = allGoals;
	}
	
    public String GetGoalkey() {
    	return this.goalkey;
	}
    public String GetGoalString() {
    	return this.goalstring;
	}
	

	public void removeEntity(Entity entity) {
    	entity.setX(500);
		entity.setY(500);
    	entities.remove(entity);    
    }
    
    public List<Entity> getEntities() {
		return entities;
	}

    public List<Entity> getEntity(int x, int y) {
    	ArrayList<Entity> result = new ArrayList<Entity>();
    	for (Entity e: entities) {
    		if (e.getX() == x && e.getY() == y) {
    			result.add(e);
    		}
    	}
    	return result;
    }
    
    public boolean checkEntity(Object obj, int x, int y) {
    	boolean result = false;
    	for (Entity e: entities) {
    		if (e.getX() == x && e.getY() == y && e.getClass() == obj.getClass()) {
    			result = true;
    			break;
    		}
    	}
    	return result;
    }
    
    public boolean checkObstacle(int x, int y, String type, String dir) {
    	ArrayList<Entity> list = (ArrayList<Entity>) getEntity(x, y);
    	boolean result = false;
    	for (Entity e: list) {
    		if (type.equals("player")) {
	        	if (e instanceof Door) {
	        		if (((Door) e).isOpen() == true) {
	        			result = false;
	    				break;
	        		} else if (player.getKey() != null && player.getKey().getColor() == ((Door) e).getColor()) {
		        		result = false;
		        		break;
	        		} else {
		        		result = true;
		        		break;
	        		}
	        	} else if (e instanceof Wall) {
	        		result = true;
	        		break;
	        	} else if (e instanceof Boulder) {
	        		if (dir == "Up") {
	        			if (checkObstacle(e.getX(), e.getY() -1, "boulder", null)) {
	        				result = true;
	        				break;
	        			}
	        		}
	        		if (dir == "Down") {
	        			if (checkObstacle(e.getX(), e.getY()+1, "boulder", null)) {
	        				result = true;
	        				break;
	        			}
	        		}
	        		if (dir == "Left") {
	        			if (checkObstacle(e.getX()-1, e.getY(), "boulder", null)) {
	        				result = true;
	        				break;
	        			}
	        		}
	        		if (dir == "Right") {
	        			if (checkObstacle(e.getX()+1, e.getY(), "boulder", null)) {
	        				result = true;
	        				break;
	        			}
	        		}
	        	}
	    	} else if (type.equals("enemy")) {
	    		// door open
	    		if (e instanceof Wall || e instanceof Door || e instanceof Exit || e instanceof Boulder|| e instanceof Enemy) {
    				if (e instanceof Door) {
    					e = (Door) e;
    					if (!((Door) e).isOpen()) {
    						result = true;
    						break;
    					}
    				} else {
    					result = true;
    					break;
    				}
	    		}
	    	} else if (type.equals("boulder")) {
	    		if (e instanceof Wall || e instanceof Door || e instanceof Portal || e instanceof Enemy || e instanceof Exit || e instanceof Boulder) {
	    			result = true;
	    			break;
	    		}
	    	}
    	}
    	return result;
    }
    
    
    public boolean checkSwitch() {
    	for (Entity e : entities) {
    		if (e instanceof FloorSwitch) {
    			FloorSwitch s = (FloorSwitch) e;
    			List<Entity> entities_list = this.getEntity(s.getX(), s.getY());
    			Entity item = this.getEntityExceptPlayerSwitch(entities_list);
    			if (item instanceof Boulder) {
    				s.setTriger(true);
    			} else if (!(item instanceof Boulder)) {
    				return false;
    			}
    		}
    	}
    	return true;
    }
    
    public int CountBoulder() {
    	int count = 0;
    	for (Entity e : entities) {
    		if (e instanceof Boulder) {
    			count+=1;
    		}
    	}
    	return count;
    }
    
    public boolean checkBoulderInCorner(int x, int y, String type) {
    	ArrayList<Entity> list = (ArrayList<Entity>) getEntity(x, y);
    	for (Entity e: list) {
    		if (type.equals("boulder")) {
	    		if (e instanceof Wall || e instanceof Door || e instanceof Portal ||e instanceof Exit) {
	    			return true;
	    		}
    		}
    	}
    	return false;
    }
    
    
    public int BoulderInCorner() {
    	int count = CountBoulder();
    	for (Entity e : entities) {
    		if (e instanceof Boulder) {
    			int x = e.getX();
    			int y = e.getY();
    			if (checkBoulderInCorner(x,y-1,"boulder") == true && checkBoulderInCorner(x-1,y,"boulder") == true) {
    				List<Entity> entity = getEntity(x,y);
    				if (getEntitySwitch(entity) == false) {
    					count-=1;
    				}
    			} else if (checkBoulderInCorner(x,y-1,"boulder") == true && checkBoulderInCorner(x + 1,y,"boulder") == true) {
    				List<Entity> entity = getEntity(x,y);
    				if (getEntitySwitch(entity) == false) {
    					count-=1;
    				}
    			} else if (checkBoulderInCorner(x - 1,y,"boulder") == true && checkBoulderInCorner(x,y + 1,"boulder") == true) {
    				List<Entity> entity = getEntity(x,y);
    				if (getEntitySwitch(entity) == false) {
    					count-=1;
    				}
    			} else if (checkBoulderInCorner(x + 1,y,"boulder") == true && checkBoulderInCorner(x,y + 1,"boulder") == true) {
    				List<Entity> entity = getEntity(x,y);
    				if (getEntitySwitch(entity) == false) {
    					count-=1;
    				}
    			} 
    		}
    	}	
    	return count;
    }
    
    
    public int CountFloorSwitch() {
    	int count = 0;
    	for (Entity e : entities) {
    		if (e instanceof FloorSwitch) {
    			count+=1;
    		}
    	}
    	return count;
    }
    
    public Entity getEntityExceptPlayer(List<Entity> entities) {
    	for (Entity e: entities) {
    		if (!(e instanceof Player)) {
    			return e;
    		}
    	}
    	return null;
    }

    public Entity getEntityExceptSwitch(List<Entity> entities) {
    	for (Entity e: entities) {
    		if (!(e instanceof FloorSwitch)) {
    			return e;
    		}
    	}
    	return null;
    }
    
    public boolean getEntitySwitch(List<Entity> entities) {
    	for (Entity e: entities) {
    		if ((e instanceof FloorSwitch)) {
    			return true;
    		}
    	}
    	return false;
    }
    
    
    public Entity getEntityExceptPlayerSwitch(List<Entity> entities) {
    	for (Entity e: entities) {
    		if (!(e instanceof Player) && !(e instanceof FloorSwitch)) {
    			return e;
    		}
    	}
    	return null;
    }
    
    
}

