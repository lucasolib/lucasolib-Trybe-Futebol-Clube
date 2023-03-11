'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      },
      homeTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        field: 'home_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        field: 'away_team_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};