Feature: New Registered User Add Multiple Items From FBT In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @mCycle @newRegisteredUser @fbt @visaCard
  Scenario Outline: New registered user should able to add multiple items from fbt
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user waits for text " Mon compte / Ouvrir une session " to be visible
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user click on " Créer un compte "
    Then the user click on "Créer un compte personnel"
    Then the user enters text "<firstName>" in the textbox " Prénom "
    Then the user enters text "<lastName>" in the textbox " Nom de famille "
    Then the user enters random email in the textbox " Adresse courriel "
    Then the user enters text "<password>" in the textbox " Mot de passe "
    Then the user enters text "<postalCode>" in the textbox " Code postal "
    Then the user clicks on the "Créer un compte" button at index "2"
    Then the user validates if " Votre compte a été créé! " text is visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Salut <firstName>, Mon compte " text is visible
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user waits for text " Articles fréquemment achetés ensemble " to be visible
    Then the user scrolls to " Articles fréquemment achetés ensemble "
    Then the user validates if "Prix total:" text is visible
    Then the user validates if "Ajouter 3 articles au panier" text is visible
    Then the user validates if all frequently bought items checkboxes are checked and components are shown
    Then the user click on "Ajouter 3 articles au panier"
    Then the user validates if "Ajouté au panier" text is visible
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user validates if "3 article(s) " text is visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user validates if the delivery form is available
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phone>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user waits for text "Utiliser une carte-cadeau" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Visa" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Visa" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " EXPÉDITION STANDARD: " text is visible

    Examples:
      | firstName | lastName | password | postalCode | address            | city        | province | phone      |
      | Lauren    | Cameron  | Test@123 | M1R 4E6    | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 |