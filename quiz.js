

angular.module('ngQuiz', ['ngSanitize'])

	.controller('ngQuizController', function ($scope, $timeout, quizProgress, scoreKeeper) {
		$scope.quizProgress = quizProgress;

		$scope.quizData = {
			"quizMetadata": {
				"title": "",
				"intro": "",
				"introImg": "assets/img/intro.png",
				"introImgCredit": " "

			},
			"quizQuestions": [{
				//01
				"question": "Primeira Pergunta",

				"feedback": "Resposta Correta D",

				"options": [{

					"name": "A",
					"correct": false
      }, {

					"name": "B",
					"correct": false
      }, {

					"name": "C",
					"correct": false
      }, {

					"name": "D",
					"correct": true
      }]
    }, {
				//02
				"question": "Segunda Pergunta",

				"feedback": " Resposta A ",

				"options": [{

					"name": " A ",
					"correct": true
      }, {

					"name": "B",
					"correct": false
      }, {

					"name": "C",
					"correct": false
      }, {
					"name": "D",
					"correct": false
      }]
    }, {


				//03
				"question": "Terceira Pergunta",
				"feedback": "Resposta D",

				"options": [{



					"name": "A",
					"correct": false
      }, {

					"name": "B",
					"correct": false
      }, {

					"name": "C",
					"correct": false
      }, {

					"name": "D",
					"correct": true
      }]
    }, {
				//04
				"question": "Pergunta 4",
				"feedback": "Correta B",
				"options": [{
					"name": "A",
					"correct": false
      }, {
					"name": "B",
					"correct": true
      }, {
					"name": "C",
					"correct": false
      }, {
					"name": "D",
					"correct": false
      }]

	}, {


				//05
				"question": "Pergunta Cinco",
				"feedback": "Correta D",
				"options": [{
					"name": "A",
					"correct": false
      }, {
					"name": "B",
					"correct": false
      }, {
					"name": "C",
					"correct": false
      }, {
					"name": "D",
					"correct": true
      }]

    }]
		};


		$scope.quizQuestions = $scope.quizData.quizQuestions;
		$scope.quizMetadata = $scope.quizData.quizMetadata;
		quizProgress.lastQuestion = $scope.quizQuestions.length;
		quizProgress.loading = false;

		 var valorDaVerdade

		$scope.startQuiz = function() {

		switch(typeof valorDaVerdade){
			case "string":
			  valorDaVerdade = parseInt(valorDaVerdade)
			  quizProgress.inProgress = true;
			  quizProgress.currentQuestion = valorDaVerdade;
			  quizProgress.imageToPreload = 1;
			  quizProgress.currentQuestionFriendly = valorDaVerdade
			  console.log('Acessando ultima questão!')
			  break;

		  case String:
			  valorDaVerdade = parseInt(valorDaVerdade)
				quizProgress.inProgress = true;
			  quizProgress.currentQuestion = valorDaVerdade;
			  quizProgress.imageToPreload = 1;
			  quizProgress.currentQuestionFriendly = valorDaVerdade
			  console.log('Acessando ultima questão!')

			  break;

		  case "String":
			  valorDaVerdade = parseInt(valorDaVerdade)
			  quizProgress.inProgress = true;
			  quizProgress.currentQuestion = valorDaVerdade;
			  quizProgress.imageToPreload = 1;
			  quizProgress.currentQuestionFriendly = valorDaVerdade
			  console.log('Acessando ultima questão!')
			  break;

		  default:
			  valorDaVerdade = 0
			  quizProgress.inProgress = true;
			  quizProgress.currentQuestion = valorDaVerdade;
			  quizProgress.imageToPreload = 1;
			  quizProgress.currentQuestionFriendly = 0
			  console.log('começa do zero!')

		 //==========================================

				/*
				  console.log(valorDaVerdade)
					console.log(fl_getLessonLocation())
					quizProgress.inProgress = true;
				  quizProgress.currentQuestion = valorDaVerdade;
				  quizProgress.imageToPreload = 1;
				  quizProgress.currentQuestionFriendly = valorDaVerdade
				  console.log('Acessando ultima questão!')
				*/
			}

		//ultimaQuestAcessada = parseInt(ultimaQuestAcessada)
	  //console.log(ultimaQuestAcessada

	};

	$scope.nextQuestion = function() {
	  if (quizProgress.currentQuestion < quizProgress.lastQuestion) {
		quizProgress.currentQuestion = quizProgress.currentQuestion + 1;
		quizProgress.currentQuestionFriendly = quizProgress.currentQuestionFriendly + 1;
		quizProgress.imageToPreload = quizProgress.imageToPreload + 1;

		console.log(quizProgress.currentQuestion)
		//quizProgress.currentQuestion = parseInt(quizProgress.currentQuestion)

		console.log(quizProgress.currentQuestion)
		console.log(quizProgress.lastQuestion)
		console.log(quizProgress.currentQuestionFriendly)

		//Alteração 2019-07-16  vinculando função scorm


	  }
	};

	$scope.answerQuestion = function(data) {
	  $scope.quizQuestions[quizProgress.currentQuestion].answered = true;
	  angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
		if (obj.name === data.selected) {
		  obj.selected = true;
		} else {
		  obj.selected = false;
		}
	  });
	};

	$scope.checkAnswer = function() {
	  $scope.quizQuestions[quizProgress.currentQuestion].answerChecked = true;

	  angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
		if (obj.selected) {
		  if (obj.correct) {
			$scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = true;
			//Linha feita em 24-07-2019
			quizProgress.guardaResultado = quizProgress.guardaResultado  + 1;

		  } else {
			$scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = false;
		  }
		}
	  });
	};

   //============================================== FIM DO QUIZ ==============================================
	$scope.getScore = function() {
		quizProgress.inProgress = false;
		quizProgress.finished = true;
		quizProgress.calculatingScore = true;
	////Linha feita em 24-07-2019

	  if(quizProgress.guardaResultado > 0){
		$scope.score = scoreKeeper.calculateScore($scope.quizQuestions);
		$scope.message = scoreKeeper.getMotivationalMessage($scope.score);
		console.log("aqui");
	  }else{
		  quizProgress.guardaResultado = parseInt(quizProgress.guardaResultado);
		  $scope.score = ((100/30) * quizProgress.guardaResultado);
		  $scope.message = scoreKeeper.getMotivationalMessage($scope.score);
		  console.log("aquikk");

	}


	  $timeout(function() {
		quizProgress.calculatingScore = false;
	  }, 1500);
	};
	$scope.startOver = function() {
		var zero = 0 //feito dia 30/07/2019 - 

	  angular.forEach($scope.quizQuestions, function(obj) {
		obj.answered = false;
		obj.answerWasRight = false;
		obj.answerChecked = false;



		angular.forEach(obj.options, function(option) {
		  option.selected = false;
		});
	  });

	  quizProgress.inProgress = true;
	  quizProgress.finished = false;
	  quizProgress.currentQuestion = 0;
	  quizProgress.currentQuestionFriendly = 1;
	  //Linha feita em 24-07-2019
	  setTimeout(function(){
	  console.log("fsfs");
	  quizProgress.guardaResultado = 0;
	  }, 100);

	};
  })
  //Atualizado em 24-07-2019
  .factory('quizProgress', function() {
	return {
	  currentQuestion: 0,
	  guardaResultado: 0,
	  imageToPreload: 0,
	  currentQuestionFriendly: 1,
	  lastQuestion: 0,
	  loading: true,
	  inProgress: false,
	  finished: false,
	  calculatingScore: false
	};
  })

  .service('scoreKeeper', function() {
	this.calculateScore = function(quizQuestions) {
	  var rightAnswers = 0;
	  angular.forEach(quizQuestions, function(obj) {
		if (obj.answerWasRight) {
		  rightAnswers += 1;
		}
	  });

	  return ((rightAnswers / quizQuestions.length) * 100).toFixed();
	};

	this.getMotivationalMessage = function(score) {
	  if (score == 70) {
		return "Você está no caminho certo e teve 70% de êxito neste simulado! Continue se preparando para o exame e busque sempre o seu melhor!";
	  } else if (score >= 70) {
		return "Parabéns! Você acertou mais de 70% das questões! Se este fosse o exame real, você teria sido aprovado. Continue assim!";
	  } else {
		return "Estude bastante e, se possível, refaça o treinamento e o simulado do exame! O objetivo é conseguir 70% de acertos para ser aprovado.";
	  }
	};
  })

  .directive('progressBar', function(quizProgress) {
	return {
	  restrict: 'A',
	  link: function(scope, element, attrs) {
		scope.$watch('quizProgress', function(newVal, oldVal) {
		  if (newVal) {
			element.css('width', ((quizProgress.currentQuestionFriendly / quizProgress.lastQuestion) * 100 + '%'));
		  }
		}, true);
	  }
	};
  })

  .directive('imagePreload', function(quizProgress) {
	return {
	  restrict: 'EA',
	  template: "<img style='display:none;' ng-src='{{quizQuestions[quizProgress.imageToPreload].questionImg}}'/>"
	};
  })

  .directive('animateProgression', function(quizProgress, $timeout) {
	return {
	  restrict: 'A',
	  link: function(scope, element, attrs) {
		scope.$watch('quizProgress.currentQuestion', function(newVal, oldVal) {
		  if (newVal) {
			element.addClass('question-animate');
			$timeout(function() {
			  element.removeClass('question-animate');
			}, 1500);
		  }
		});
	  }
	};
  });
