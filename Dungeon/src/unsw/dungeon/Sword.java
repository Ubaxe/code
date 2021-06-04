package unsw.dungeon;

public class Sword extends Entity {
	
	private int hit;
	
	public Sword(int x, int y) {
		super(x, y);
		this.hit = 5;
	}

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
	}
	
	public void reduceHit() {
		if (this.hit > 0) {
			this.hit = this.hit - 1;
		}
	}
	
	

}
