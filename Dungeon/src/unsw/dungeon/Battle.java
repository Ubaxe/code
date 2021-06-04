package unsw.dungeon;

public class Battle implements Action {

	@Override
	public void action(Dungeon dungeon, Player player, Entity entity, String dire) {
		if (entity instanceof Enemy) {
			if (player.getPlayerState() instanceof NormalState) {
				if (player.getSword() != null) {
					if (entity instanceof BigEnemy) {
						if (player.getSword().getHit() >= 3) {
		    				player.getSword().reduceHit();
		    				player.getSword().reduceHit();
		    				player.getSword().reduceHit();
			    			dungeon.removeEntity(entity);
			    			if (player.getSword().getHit() == 0) {
			    				player.setSword(null);
			    			}
			    		} else {
			    			player.setPlayerState(new GameOverState());
			    		}
					} else {
						if (player.getSword().getHit() >= 0) {
		    				player.getSword().reduceHit();
			    			dungeon.removeEntity(entity);
			    			if (player.getSword().getHit() == 0) {
			    				player.setSword(null);
			    			}
			    		} else {
			    			player.setPlayerState(new GameOverState());
			    		}
					}
				} else {
	    			player.setPlayerState(new GameOverState());
	    		}
	    	} else if (player.getPlayerState() instanceof InvincibleState) {
	    		dungeon.removeEntity(entity);
	    	} else if (player.getPlayerState() instanceof GameOverState) {

	    	}
		}
	}
}
