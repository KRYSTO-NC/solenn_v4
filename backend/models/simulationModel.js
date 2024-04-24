import mongoose from 'mongoose'
import UserSchema from './userModel.js'
const simulationSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],

    refference: {
      type: String,
    },

    idPropal: {
      type: String,
      default: null,
    },

    // si True type abonement
    raccordReseau: {
      type: Boolean,
    },

    pro: {
      type: Boolean,
    },

    typeAbonnement: {
      type: String,
      enum: ['Basse tension', 'Haute tension', 'non defini'],
      default: 'non defini',
    },

    // Informations générales
    typeInstallation: {
      raccordement: {
        type: String,
        enum: ['mono', 'tri', 'non defini'],
        default: 'non defini',
      },
      puissance: {
        type: Number,
        default: 0,
      },
      amperage: {
        type: Number,
        default: 0,
      },
    },

    consoN: {
      janv: {
        type: Number,
        default: 0,
      },
      fev: {
        type: Number,
        default: 0,
      },
      mars: {
        type: Number,
        default: 0,
      },
      avril: {
        type: Number,
        default: 0,
      },
      mai: {
        type: Number,
        default: 0,
      },
      juin: {
        type: Number,
        default: 0,
      },
      juillet: {
        type: Number,
        default: 0,
      },
      aout: {
        type: Number,
        default: 0,
      },
      sept: {
        type: Number,
        default: 0,
      },
      oct: {
        type: Number,
        default: 0,
      },
      nov: {
        type: Number,
        default: 0,
      },
      dec: {
        type: Number,
        default: 0,
      },
    },
    consoN1: {
      janv: {
        type: Number,
        default: 0,
      },
      fev: {
        type: Number,
        default: 0,
      },
      mars: {
        type: Number,
        default: 0,
      },
      avril: {
        type: Number,
        default: 0,
      },
      mai: {
        type: Number,
        default: 0,
      },
      juin: {
        type: Number,
        default: 0,
      },
      juillet: {
        type: Number,
        default: 0,
      },
      aout: {
        type: Number,
        default: 0,
      },
      sept: {
        type: Number,
        default: 0,
      },
      oct: {
        type: Number,
        default: 0,
      },
      nov: {
        type: Number,
        default: 0,
      },
      dec: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ['Prospect', 'Gagné', 'Sans suite'],
      default: 'Prospect',
    },

    demandeur: {
      type: String,
      default: 'non renseigné',
    },

    benneficiaire: {
      type: String,
      default: 'non renseigné',
    },

    concessionaire: {
      type: String,
      enum: ['EEC', 'Enercal', 'non renseigné'],
      default: 'non renseigné',
    },
    numCompteurEnercal: {
      type: String,
      default: 'non renseigné',
    },

    numClientEnercal: {
      type: String,
      default: 'non renseigné',
    },

    address: {
      type: String,
      default: 'Aucune adresse renseignée',
    },

    // Informations sur la demande EEC
    demandeEEC: {
      dateDemande: {
        type: Date,
      },
      dateAccord: {
        type: Date,
      },
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    // Informations sur la demande Enercal
    demandeEnercal: {
      dateDemande: {
        type: Date,
      },
      dateAccord: {
        type: Date,
      },
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    // Informations sur la demande Dimenc
    demandeDimenc: {
      dateDemande: {
        type: Date,
      },
      dateAccord: {
        type: Date,
      },
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    // Informations sur la demande Dimenc
    demandeCotsuel: {
      dateDemande: {
        type: Date,
      },
      datePassage: {
        type: Date,
      },
      dateLeveeReserve: {
        type: Date,
      },
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    // Informations sur la conformité
    conformite: {
      dateDemande: {
        type: Date,
      },
      status: {
        type: String,
        enum: [
          'Non Commencé',
          'En Demande',
          'Accepté',
          'Refusé',
          'sous-reserve',
        ],
        default: 'Non Commencé',
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },

    dateAccord: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Accord'],
        default: 'En attente',
      },
    },
    accompte: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Reçu'],
        default: 'En attente',
      },
    },
    datePrevisionelPose: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Prévu'],
        default: 'En attente',
      },
    },

    datePose: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Prévu', 'Posé', 'Retard'],
        default: 'En attente',
      },
    },
    datePrevisionelMiseEnService: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Prévu'],
        default: 'En attente',
      },
    },

    dateMiseEnService: {
      date: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['En attente', 'Prévu', 'En service', 'Retard'],
        default: 'En attente',
      },
    },
    dureeGarantieEnAnnees: {
      type: Number,
      default: 1,
    },
    garantieActive: {
      type: Boolean,
      default: false,
    },

    // Informations techniques
    puissanceSouscrite: {
      type: Number,
      default: 0,
    },

    // si stockage true
    stockage: {
      type: Boolean,
      default: false,
    },

    typeBaterrie: {
      type: String,
      enum: ['Lithium', 'Plomb', 'Autre'],
    },

    capaciteBatterie: {
      type: Number,
      default: 0,
    },
    batteries: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    modulesPV: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    onduleurs: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],

    prestations: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    suppervision: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
    supportage: [
      {
        _id: false, // Désactive la génération automatique de _id
        ref: { type: String },
        quantity: { type: Number },
        multiprices: {
          pro: { type: Number },
          part: { type: Number },
        },
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

simulationSchema.methods.activerGarantie = function () {
  const currentDate = new Date()
  const expirationDate = new Date(this.dateMiseEnService)
  expirationDate.setFullYear(
    expirationDate.getFullYear() + this.dureeGarantieEnAnnees,
  )
  this.garantieActive = currentDate < expirationDate
}

simulationSchema.methods.verifierStatutGarantie = function () {
  const currentDate = new Date()
  const expirationDate = new Date(this.dateMiseEnService)
  expirationDate.setFullYear(
    expirationDate.getFullYear() + this.dureeGarantieEnAnnees,
  )

  if (currentDate < expirationDate) {
    console.log('La garantie est active.')
    this.garantieActive = true
  } else {
    console.log("La garantie n'est pas active.")
    this.garantieActive = false
  }
}

simulationSchema.pre('save', async function (next) {
  // Utilisation de "async" pour autoriser l'utilisation de "await"
  console.log('Pre-save hook triggered')

  // Génération du champ refference
  if (!this.refference) {
    const currentYear = new Date().getFullYear()
    const count = await Simulation.countDocuments({
      refference: new RegExp(`^${currentYear}-`, 'i'),
    })
    console.log('Reference count:', count)
    this.refference = `${currentYear}-${count + 1}`
  }

  // Activation de la garantie
  if (this.dateMiseEnService && this.dureeGarantieEnAnnees) {
    this.activerGarantie()
  }

  next()
})

const Simulation = mongoose.model('Simulation', simulationSchema)

export default Simulation
