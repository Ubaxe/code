package unsw.dungeon;

public class Key extends Entity {
	
	private int color;
	public Key(int x, int y, int color) {
		super(x, y);
		this.color = color;
	}

	
	
	public int getColor() {
		return this.color;
	}
}
