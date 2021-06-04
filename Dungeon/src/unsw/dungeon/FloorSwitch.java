package unsw.dungeon;

public class FloorSwitch extends Entity {
	
	private boolean triger;
	
	public FloorSwitch(int x, int y) {
        super(x, y);
        this.triger = false;
    }

	public boolean isTriger() {
		return this.triger;
	}

	public void setTriger(boolean triger) {
		this.triger = triger;
	}



	
	
}
