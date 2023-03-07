import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeamId' });

Team.belongsTo(Match, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Team.belongsTo(Match, { foreignKey: 'away_team_id', as: 'awayTeamId' });

export default Match;
