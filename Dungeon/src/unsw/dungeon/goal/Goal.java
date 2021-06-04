package unsw.dungeon.goal;

import java.util.ArrayList;

import unsw.dungeon.*;

public interface Goal {
	public boolean isSatisfied(Dungeon dungeon);
	public void removeGoal(Goal g);
	public void addGoal(Goal g);
}
