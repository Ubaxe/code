package unsw.dungeon.goal;
import java.util.ArrayList;
import java.util.List;

import unsw.dungeon.*;

public class FloorSwitchGoal implements Goal {

	@Override
	public boolean isSatisfied(Dungeon dungeon) {
		boolean result = true;
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntities();
		for (Entity e : entities) {
    		if (e instanceof FloorSwitch) {
    			boolean singleResult = false;
    			FloorSwitch s = (FloorSwitch) e;
    			List<Entity> entity = dungeon.getEntity(s.getX(), s.getY());
    			for (Entity item: entity) {
	    			if (item instanceof Boulder) {
	    				s.setTriger(true);
	    				singleResult = true;
	    			}
    			}
    			if (singleResult == false) {
    				result = false;
    				break;
    			}
    		}
    	}
    	return result;
	}

	@Override
	public void addGoal(Goal g) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeGoal(Goal g) {
		// TODO Auto-generated method stub
		
	}
	

}
