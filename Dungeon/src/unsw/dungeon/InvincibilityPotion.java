package unsw.dungeon;

import java.util.Timer; 
import java.util.TimerTask;

public class InvincibilityPotion extends Entity {
	

	public InvincibilityPotion(int x, int y) {
		super(x, y);

	}

	public void TimeLimitation(Dungeon dungeon, Player player) {
		player.getPlayerState().changeInvincibleState(player);
		System.out.println("Player is InvincibleState now");
		Timer timer = new Timer(); 
		TimerTask task = new TimerTask() {
			public void run() {  
				player.getPlayerState().changeNormalState(player);
				System.out.println("The Invincible potion is not available now");
			} 
		};
		timer.schedule(task, 3000);
	}
	
	
}
