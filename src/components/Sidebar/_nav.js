export default {
  items: {
    "member":[
      {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
      {
        name: 'Subscription',
        url: '/subscription',
        icon: 'icon-layers',
        badge: {
          variant: 'info',
          text: 'NEW'
        },
        children: [{
          name: 'List Programs',
          url: '/subscription/programs',
          icon: 'icon-list'
        },{
          name: 'New / Renewal',
          url: '/subscription/renewal',
          icon: 'icon-puzzle'
        }]
      }
    ], 
    "sales":[{
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },{
        name: 'Subscriptions',
        url: '/subscription',
        icon: 'icon-layers',
        badge: {
          variant: 'info',
          text: 'NEW'
        },
        children: [{
          name: 'List Programs',
          url: '/subscription/programs',
          icon: 'icon-list'
        },{
          name: 'New Program',
          url: '/subscription/new',
          icon: 'icon-puzzle'
        }]
      },{
        name: 'Offers',
        url: '/offers',
        icon: 'icon-fire',
        badge: {
          variant: 'info',
          text: 'NEW'
        },
        children: [{
          name: 'List Offers',
          url: '/offers/list',
          icon: 'icon-list'
        },{
          name: 'New Offer',
          url: '/offers/new',
          icon: 'icon-puzzle'
        }]
    }],
    "service":[{
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },{
      name: 'Reports',
      url: '/reports',
      icon: 'icon-layers',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    }]
  }
};
