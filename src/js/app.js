App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
   
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('points.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var pointsArtifact = data;
      App.contracts.points = TruffleContract(pointsArtifact);
    
      // Set the provider for our contract
      App.contracts.points.setProvider(App.web3Provider);  
      return App.renderGUI();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
     var pointsInstance;
     $(document).ready(function(){
        $("#creativebtn").click(function() {
            App.contracts.points.deployed().then(function(instance) {
              pointsInstance = instance;
              pointsInstance.vote_creativity();
              App.renderGUI();
            });
        });

        $("#intelligentbtn").click(function() {
          App.contracts.points.deployed().then(function(instance) {
            pointsInstance = instance;
            pointsInstance.vote_intelligent();
            App.renderGUI();
          });
      });
      $("#hardworkerbtn").click(function() {
        App.contracts.points.deployed().then(function(instance) {
          pointsInstance = instance;
          pointsInstance.vote_hardworker();
          App.renderGUI();
        });
    });

      });

   
  },

  renderGUI: function() {
    var pointsInstance;
    App.contracts.points.deployed().then(function(instance) {
      pointsInstance = instance;
      return pointsInstance.creativity();
    }).then(function(val){
      val = val.toNumber();
      $("#creativelbl").text(val);
    });
    
    App.contracts.points.deployed().then(function(instance) {
      pointsInstance = instance;
      return pointsInstance.intelligent();
    }).then(function(val){
      val = val.toNumber();
      $("#intelligentlbl").text(val);
    });
    
    App.contracts.points.deployed().then(function(instance) {
      pointsInstance = instance;
      return pointsInstance.hardworker();
    }).then(function(val){
      val = val.toNumber();
      $("#hardworkerlbl").text(val);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
