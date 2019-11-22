const Sequelize = require('sequelize')

/**
 * Class Generated
 * with command: ./node_modules/.bin/sequelize-auto -o "./src/models" -h [host] -d [base] -u sa -x "[pass]" -e mssql -t payment_links
 */

class PaymentLinks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      'payment_links',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        idLead: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        idClient: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        paymentMethods: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        paymentValue: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        installmentsNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expirationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        paymentLink: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        paidDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        clientName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        taxDocumentNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        taxDocumentType: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        clientEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: '1',
        },
        cancelDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        paymentStatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: 'payment_links',
        timestamps: false,
      },
    )
  }
}

module.exports = PaymentLinks
