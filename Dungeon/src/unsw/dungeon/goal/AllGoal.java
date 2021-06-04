package unsw.dungeon.goal;

import java.util.ArrayList;

import com.sun.tools.javac.util.List;

import unsw.dungeon.Dungeon;

public class AllGoal implements Goal {
	private ArrayList<Goal> goalList;
	
	public AllGoal() {
		goalList = new ArrayList<Goal>();
	}
	
	
	public ArrayList<Goal> getGoalList() {
		return goalList;
	}

	
	public void setGoalList(ArrayList<Goal> goalList) {
		this.goalList = goalList;
	}

	@Override
	public boolean isSatisfied(Dungeon dungeon) {
		for (Goal g: goalList) {
			if (!g.isSatisfied(dungeon)) {
				return false;
			}
		}
		return true;
	}
	
	public void addGoal(Goal g) {
		goalList.add(g);
	}

	@Override
	public void removeGoal(Goal g) {
		goalList.remove(g);
	}

}
