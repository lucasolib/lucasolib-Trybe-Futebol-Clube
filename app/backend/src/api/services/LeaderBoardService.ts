import { ModelStatic, literal, ProjectionAlias } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';

class LeaderBoardService {
  protected modelMatches: ModelStatic<Match> = Match;
  static getHomeAttributes() {
    const attributes = [
      { name: 'name', value: literal('homeTeam.team_name') },
      { name: 'totalPoints',
        value: literal(`SUM(home_team_goals > away_team_goals)*3 + 
          SUM(home_team_goals = away_team_goals)`) },
      { name: 'totalGames', value: literal('(COUNT(home_team_id))') },
      { name: 'totalVictories', value: literal('(SUM(home_team_goals > away_team_goals))') },
      { name: 'totalDraws', value: literal('(SUM(home_team_goals = away_team_goals))') },
      { name: 'totalLosses', value: literal('(SUM(home_team_goals < away_team_goals))') },
      { name: 'goalsFavor', value: literal('(SUM(home_team_goals))') },
      { name: 'goalsOwn', value: literal('(SUM(away_team_goals))') },
      { name: 'goalsBalance', value: literal('(SUM(home_team_goals)) - (SUM(away_team_goals))') },
      { name: 'efficiency',
        value: literal(`ROUND(((SUM(home_team_goals > away_team_goals)*3) + 
          SUM(home_team_goals = away_team_goals))/(COUNT(home_team_id)*3)*100, 2)`) },
    ];
    return attributes.map(({ name, value }) => [value, name] as ProjectionAlias);
  }

  public async homeLeaderboard(): Promise<Match[]> {
    const matches = await this.modelMatches.findAll({
      attributes: LeaderBoardService.getHomeAttributes(),
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC']],
      include: [{ model: Team, as: 'homeTeam', attributes: [] }],
      group: ['home_team_id'],
      where: { inProgress: false },
    });
    return matches;
  }
}
export default LeaderBoardService;
