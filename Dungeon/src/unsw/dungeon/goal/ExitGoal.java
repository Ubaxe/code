package unsw.dungeon.goal;
import java.util.ArrayList;

import com.sun.tools.javac.util.List;

import unsw.dungeon.*;

public class ExitGoal implements Goal {
	
	public ExitGoal() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean isSatisfied(Dungeon dungeon) {
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntities();
		Player player = dungeon.getPlayer();
		for (Entity e : entities) {
    		if (e instanceof Exit) {
    			if (player.getX() == e.getX() && player.getY() == e.getY()) {
    				return true;
    			}
    		}
    	}
    	return false;
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
