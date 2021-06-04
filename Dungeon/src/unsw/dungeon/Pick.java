package unsw.dungeon;

public class Pick implements Action {

	@Override
	public void action(Dungeon dungeon, Player player, Entity entity, String dire) {
		if (entity instanceof Key && player.getKey() == null) {
			dungeon.removeEntity(entity);
			player.setKey((Key) entity);
		} else if (entity instanceof Treasure) {
			dungeon.removeEntity(entity);
		} else if (entity instanceof Sword && player.getSword() == null) {
			dungeon.removeEntity(entity);
			player.setSword((Sword) entity);
		} else if (entity instanceof InvincibilityPotion) {
			dungeon.removeEntity(entity);
			InvincibilityPotion potion = (InvincibilityPotion) entity;
			potion.TimeLimitation(dungeon, player);
			player.getPlayerState().changeInvincibleState(player);
		}
	}


}
