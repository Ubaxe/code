package unsw.dungeon.goal;

import java.util.ArrayList;

import com.sun.tools.javac.util.List;

import unsw.dungeon.*;

public class TreasureGoal implements Goal {

	@Override
	public boolean isSatisfied(Dungeon dungeon) {
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntities();
		for (Entity e : entities) {
    		if (e instanceof Treasure) {
    			return false;
    		}
    	}
    	return true;
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
