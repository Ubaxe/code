package unsw.dungeon;

public class AlwaysOpenDoor extends Entity {
	
	private boolean open;
	private int color;
	
	public AlwaysOpenDoor(int x, int y,int color) {
		super(x, y);
		open = true;
		this.color = color;
	}

	public boolean isOpen() {
		return this.open;
	}

	public int getColor() {
		return this.color;
	}
	
	public void setOpen(boolean open) {
		this.open = open;
	}
	
	
}
