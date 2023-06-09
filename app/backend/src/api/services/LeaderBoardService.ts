import { ModelStatic, literal, ProjectionAlias } from 'sequelize';
import Team from '../../database/models/TeamModel';
import Match from '../../database/models/MatchModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';

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

  static getAwayAttributes() {
    const attributes = [
      { name: 'name', value: literal('awayTeam.team_name') },
      { name: 'totalPoints',
        value: literal(`SUM(away_team_goals > home_team_goals)*3 + 
          SUM(away_team_goals = home_team_goals)`) },
      { name: 'totalGames', value: literal('(COUNT(away_team_id))') },
      { name: 'totalVictories', value: literal('(SUM(away_team_goals > home_team_goals))') },
      { name: 'totalDraws', value: literal('(SUM(away_team_goals = home_team_goals))') },
      { name: 'totalLosses', value: literal('(SUM(away_team_goals < home_team_goals))') },
      { name: 'goalsFavor', value: literal('(SUM(away_team_goals))') },
      { name: 'goalsOwn', value: literal('(SUM(home_team_goals))') },
      { name: 'goalsBalance', value: literal('(SUM(away_team_goals)) - (SUM(home_team_goals))') },
      { name: 'efficiency',
        value: literal(`ROUND(((SUM(away_team_goals > home_team_goals)*3) + 
          SUM(away_team_goals = home_team_goals))/(COUNT(away_team_id)*3)*100, 2)`) },
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
    console.log(matches);
    return matches;
  }

  public async awayLeaderboard(): Promise<Match[]> {
    const matches = await this.modelMatches.findAll({
      attributes: LeaderBoardService.getAwayAttributes(),
      order: [['totalPoints', 'DESC'], ['totalVictories', 'DESC'], ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'], ['goalsOwn', 'DESC']],
      include: [{ model: Team, as: 'awayTeam', attributes: [] }],
      group: ['away_team_id'],
      where: { inProgress: false },
    });
    return matches;
  }

  static mapMatches(array: Match[], secondArray: Match[]): ILeaderBoard[] {
    return array.map((awayMatch: Match) => {
      const AMatch = awayMatch.dataValues;
      const homeMatch = secondArray.find((match: Match) => AMatch.name === match.dataValues.name);
      const HMatch = homeMatch?.dataValues;
      return ({ name: AMatch.name,
        totalPoints: Number(AMatch.totalPoints) + Number(HMatch.totalPoints),
        totalGames: Number(AMatch.totalGames) + Number(HMatch.totalGames),
        totalVictories: Number(AMatch.totalVictories) + Number(HMatch.totalVictories),
        totalDraws: Number(AMatch.totalDraws) + Number(HMatch.totalDraws),
        totalLosses: Number(AMatch.totalLosses) + Number(HMatch.totalLosses),
        goalsFavor: Number(AMatch.goalsFavor) + Number(HMatch.goalsFavor),
        goalsOwn: Number(AMatch.goalsOwn) + Number(HMatch.goalsOwn),
        goalsBalance: Number(AMatch.goalsBalance) + Number(HMatch.goalsBalance),
        efficiency: (((Number(AMatch.totalPoints) + Number(HMatch.totalPoints))
        / ((Number(AMatch.totalGames) + Number(HMatch.totalGames)) * 3)) * 100).toFixed(2),
      });
    });
  }

  public async Leaderboard(): Promise<ILeaderBoard[]> {
    const awayMatches = await this.awayLeaderboard();
    const homeMatches = await this.homeLeaderboard();
    const fullMatches = LeaderBoardService.mapMatches(awayMatches, homeMatches);
    return fullMatches;
  }
}
export default LeaderBoardService;
