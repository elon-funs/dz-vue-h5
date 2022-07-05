export default {
    name: 'Nom',
    tel: 'Telephone',
    save: 'Sauvegarder',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    delete: 'Suprimer',
    complete: 'Terminé',
    loading: 'Chargement...',
    telEmpty: 'Veuillez remplir le tel',
    nameEmpty: 'Veuillez remplir le nom',
    nameInvalid: 'Nom incorrect',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer?',
    telInvalid: 'Numéro de téléphone incorrect',
    vanCalendar: {
        end: 'Fin',
        start: 'Début',
        title: 'Calendrier',
        startEnd: 'Début/Fin',
        weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        monthTitle: (year, month) => `${year}/${month}`,
        rangePrompt: (maxRange) => `Choisir pas plus de ${maxRange} jours`
    },
    vanCascader: {
        select: 'Sélectionner'
    },
    vanContactCard: {
        addText: 'Ajouter des informations de contact'
    },
    vanContactList: {
        addText: 'Ajouter un nouveau contact'
    },
    vanPagination: {
        prev: 'Précédent',
        next: 'Suivant'
    },
    vanPullRefresh: {
        pulling: 'Tirer pour actualiser ...',
        loosing: 'Relâchez pour actualiser...'
    },
    vanSubmitBar: {
        label: 'Total：'
    },
    vanCoupon: {
        unlimited: 'Illimité',
        discount: (discount) => `${discount * 10}% de réduction`,
        condition: (condition) => `Au moins ${condition}`
    },
    vanCouponCell: {
        title: 'Coupon',
        tips: 'Pas de coupons',
        count: (count) => `Vous avez ${count} coupons`
    },
    vanCouponList: {
        empty: 'Pas de coupons',
        exchange: 'Exchange',
        close: 'Fermer',
        enable: 'Disponible',
        disabled: 'Indisponible',
        placeholder: 'Code coupon'
    },
    vanAddressEdit: {
        area: 'Zone',
        postal: 'Postal',
        areaEmpty: 'Veuillez sélectionner une zone de réception',
        addressEmpty: "L'adresse ne peut pas être vide",
        postalEmpty: 'Mauvais code postal',
        defaultAddress: 'Définir comme adresse par défaut',
        telPlaceholder: 'Téléphone',
        namePlaceholder: 'Nom',
        areaPlaceholder: 'Zone'
    },
    vanAddressEditDetail: {
        label: 'Adresse',
        placeholder: 'Adresse'
    },
    vanAddressList: {
        add: 'Ajouter une nouvelle adresse'
    }
}