Feature: New Registered User Navigates Through Department And Place Order Using HDCC Card In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @newRegisteredUser @hdcc @sth @mCycle
  Scenario Outline: New registered user should be able to navigate through department and place order using HDCC card FR
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
    Then the user validates if button "Créer un compte" is enabled
    Then the user clicks on the "Créer un compte" button at index "2"
    Then the user presses keyboard key "Escape"
    Then the user validates if " Salut <firstName>, Mon compte " text is visible
    Then the user click on "Magasiner par rayon"
    Then the user click on "Salle de bain"
    Then the user click on "Cabines de douche et portes de cabine de douche"
    Then the user click on "Portes de cabine de douche"
    Then the user presses keyboard key "Escape"
    Then the user clicks on the checkbox "En stock aujourd’hui à"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Pertinence"
    Then the user click on "Meilleure cote"
    Then the user waits until the spinner is no longer visible
    Then the user clicks on text "Nº d'article # " at index "1"
    Then the user refresh the page
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user add product to cart
    Then the user click on "Afficher le panier"
    Then the user waits for text "Mon Panier: " to be visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters text "<phone>" in the textbox "Téléphone"
    Then the user enters text "<city>" in the textbox "Ville"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Code postal"
    Then the user enters text "<address>" in textbox with placeholder "Commencez à saisir votre adresse ..."
    Then the user click on "Continuer"
    Then the user waits for text "carte de crédit" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Hdcc" card
    Then the user click on "Continuer"
    Then the user waits for text "Passer la commande" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " EXPÉDITION STANDARD: " text is visible

    Examples:
      | firstName | lastName | password | address            | city        | province | postalCode | phone      |
      | Luther    | Bergeron | Test@123 | 428 Ellesmere Road | Scarborough | Ontario  | M1R4E6     | 4704243288 |