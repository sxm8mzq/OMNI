Feature: Guest User BOPIS Write A Review Amex FR

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @guestUser @bopis @amex @mCycle @addToCartATCPanel
  Scenario Outline: Guest user should able to write and buy a BOPIS item with an Amex card FR
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user presses keyboard key "Enter"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user clicks on text "Q et R (" at index "1"
    Then the user click on "Poser une question"
    Then the user enters text "<question>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<firstName>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<email>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<location>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user presses keyboard key "Enter"
    Then the user click on " Ramassage en magasin "
    Then the user add product to cart
    Then the user click on "Ajouté au panier"
    Then the user presses key "Tab" "9" times
    Then the user presses keyboard key "Enter"
    Then the user click on "Afficher le panier"
    Then the user waits for text " Ramassage en magasin" to be visible
    Then the user clicks on text " Sélectionner une date à la caisse " at index "1"
    Then the user validates if " Ramassage en magasin : " text is visible
    Then the user clicks on text " Sélectionner une date à la caisse " at index "2"
    Then the user validates if " Ramassage en magasin : " text is visible
    Then the user click on "Passer à la caisse"
    Then the user waits for text " Commande sécurisée " to be visible
    Then the user click on "Commander en tant qu’invité"
    Then the user waits for text "Ramassage en magasin :" to be visible
    Then the user enters text "<firstName>" in the textbox "Prénom"
    Then the user enters text "<lastName>" in the textbox "Nom de famille"
    Then the user enters random email in the textbox "Adresse courriel"
    Then the user enters text "<phone>" in the textbox "Téléphone "
    Then the user click on "Quelqu’un d’autre ramassera cette commande"
    Then the user presses keyboard key "Tab"
    Then the user enters text "Testing" in current textbox
    Then the user presses key "Tab" "2" times
    Then the user enters text "Web" in current textbox
    Then the user presses key "Tab" "2" times
    Then the user enters text "random@testemail.com" in current textbox
    Then the signed in user selects pickup date
    Then the user click on "Continuer"
    Then the user waits for text "carte de crédit" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters french "Amex" card details
    Then the user switches to the parent frame
    Then the user enters french billing details for "Amex" card
    Then the user click on "Continuer"
    Then the user waits for text "Sommaire de la commande :" to be visible
    Then the user clicks on text "Passer la commande" at index "1"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text " Numéro de commande:" is visible at index "1"
    Then the user validates if " RAMASSAGE EN MAGASIN: " text is visible

    Examples:
      | email                     | question                    | firstName | location         | lastName | phone      |
      | testuser001@homedepot.com | Est-ce un bois écologique ? | Test      | Toronto, Ontario | User     | 3456778899 |