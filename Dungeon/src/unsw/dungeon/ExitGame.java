package unsw.dungeon;

public class ExitGame implements Action {
	@Override
	public void action(Dungeon dungeon, Player player, Entity entity, String dire) {
		if (entity instanceof Exit) {
			player.setPlayerState(new GameOverState());
		}
	}
}
