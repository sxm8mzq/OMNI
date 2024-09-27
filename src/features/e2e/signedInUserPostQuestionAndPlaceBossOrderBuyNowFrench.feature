Feature: Post Question And Place Boss Order Using BuyNow In French

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @questionAnswer @guestUser @boss @buyNow
  Scenario Outline: SignedIn user should able to post question and place boss order using buyNow in french
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Français"
    Then the user click on " Mon compte / Ouvrir une session "
    Then the user waits for text "Adresse courriel" to be visible
    Then the user enters text "<email>" in the textbox "Adresse courriel"
    Then the user enters text "<password>" in the textbox "Mot de passe"
    Then the user click on "Ouvrir une session"
    Then the user validates if " Salut John, Mon compte " text is visible
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "Que cherchez-vous?"
    Then the user clicks on the "search" icon at index "1"
    Then the user waits for text "Ajouter au panier" to be visible
    Then the user clicks on text "Q et R (" at index "1"
    Then the user click on "Poser une question"
    Then the user enters text "<question>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<nickName>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<email>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user enters text "<location>" in current textbox
    Then the user presses keyboard key "Tab"
    Then the user presses keyboard key "Enter"
    Then the user presses key "Tab" "3" times
    Then the user presses keyboard key "Enter"
    Then the user presses keyboard key "Enter"
    Then the user scrolls to "Ajouter au panier"
    Then the user click on "Acheter maintenant"
    Then the user waits for text "Commande totale" to be visible
    Then the user validates if " Ramassage en magasin " text is visible
    Then the user validates if " SCARBOROUGH #7001 " text is visible
    Then the user click on "Passer la commande"
    Then the user waits for text " Confirmation de commande " to be visible
    Then the user waits for text " Votre commande a bien été reçue. " to be visible
    Then the user validates if " Votre commande a bien été reçue. " text is visible
    Then the user validates if the text "Numéro de commande" is visible at index "1"
    Then the user validates if " Option Acheter maintenant - " text is visible
    Then the user validates if "activée" text is visible
    Then the user validates if " EXPÉDITION AU MAGASIN: " text is visible

    Examples:
      | email                          | password | question                               | nickName | location         |
      | marcellus_schmeler44@gmail.com | Test@123 | Cela peut-il être utilisé en cuisine ? | TestUser | Toronto, Ontario |