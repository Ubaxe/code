package unsw.dungeon;

public class Door extends Entity {
	
	private boolean open;
	private int color;
	
	public Door(int x, int y,int color) {
		super(x, y);
		open = false;
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
