package unsw.dungeon;

public class GameOverState implements PlayerState {

	@Override
	public void changeInvincibleState(Player player) {
		player.setPlayerState(new InvincibleState());
	}

	@Override
	public void changeNormalState(Player player) {
		player.setPlayerState(new NormalState());
		
	}

	@Override
	public void changeGameOverState(Player player) {
		player.setPlayerState(new GameOverState());
	}

}
