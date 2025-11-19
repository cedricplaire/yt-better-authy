![file icon for document heading]("/file.svg")

Bonjour. Nous allons aujourd'hui voir comment supprimer le message d'avertissement de NextJs concernant le fichier middleware.ts a la base de votre projet. Tout d'abords, expliquons pourquoi ce message apparait depuis quelques temps et ensuite comment remédier a cette situation.
Pourquoi Middleware est il déprécié ? la raison principale, est que c'est un nom de fonction utilitaire très usité dans Express
et pas qu'Express d'ailleur, c'est le nom utilisé pour toute fonction qui introduit quelque chose entre la requette et la réponse d'un serveur. D'où le nom de middleware, que l'on pourrait traduire par (logiciel intermediaire).
Par exemple, lors d'un accés serveur on peut regarder dans la requette si l'utilisateur est authentifié et si c'est la cas, envoyer la reponse avec la route prevue. sinon on envoie une route par defaut (vous n'êtes pas connecté ...) Tout ce mecanisme est appelé middleware. Par soucis de claireté NextJs a donc décider de renomer son fichier middleware.js ou .ts en Proxy.ts
