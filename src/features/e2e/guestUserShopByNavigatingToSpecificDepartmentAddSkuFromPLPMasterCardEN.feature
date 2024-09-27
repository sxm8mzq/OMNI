Feature: Guest User Shops By Department Add Sku Checkout With Master Card In English

  Background: User launches url
    Given the user launches the url

  @e2e @regressionTest @bopis @guestUser @masterCard @mCycle @lowStock
  Scenario Outline: Guest user should able to shop by department add sku checkout with mastercard in english
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the "search" icon at index "2"
    Then the user waits for text "SCARBOROUGH #7001" to be visible
    Then the user click on "Select"
    Then the user click on "Shop by Department"
    Then the user click on "Bath"
    Then the user click on "Showers & Shower Doors"
    Then the user click on "Shower Doors"
    Then the user presses keyboard key "Escape"
    Then the user waits for text "In Stock Today at" to be visible
    Then the user clicks on the checkbox "In Stock Today at"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Delivery & Pick-Up"
    Then the user clicks on text "FREE Store Pick-Up" at index "1"
    Then the user waits until the spinner is no longer visible
    Then the user click on "Recommended"
    Then the user click on "Highest Rated"
    Then the user waits until the spinner is no longer visible
    Then the user clicks on text "SKU # " at index "1"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Store Pick-Up "
    Then the user enters value "<noOfProductabove10>" in dropdown "Qty"
    Then the user enters text "<maxQuantity>" in the textbox "Qty"
    Then the user add product to cart
    Then the user validates if "Select a different delivery/pick-up method to check for stock availability." text is visible
    Then the user click on "View Cart"
    Then the user waits for text "My Cart: " to be visible
    Then the user clicks on text " Select date in checkout " at index "1"
    Then the user waits for text " Store Pick-Up: " to be visible
    Then the user enters text "<maxQuantity>" in the textbox "Qty"
    Then the user presses keyboard key "Enter"
    Then the user validates if the text "The quantity has been reduced due to low stock. We can only provide you with" is visible at index "1"
    Then the user click on "MAAX"
    Then the user waits for text "Add To Cart" to be visible
    Then the user click on " Store Pick-Up "
    Then the user enters text "<maxQuantity>" in the textbox "Qty"
    Then the user click on "Add To Cart"
    Then the user validates if "This product is temporarily out of stock and could not be added to your cart." text is visible
    Then the user click on " Cart "
    Then the user enters text "1" in the textbox "Qty"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for text " Cart Summary: " to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<phoneNum>" in the textbox "Phone"
    Then the signed in user selects pickup date
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Mastercard" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Mastercard" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for text " Confirmation " to be visible
    Then the user waits for text " Your order was successful. " to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the text " Order Number:" is visible at index "1"
    Then the user validates if " PICK UP IN-STORE: " text is visible

    Examples:
      | firstName | lastName    | phoneNum   | noOfProductabove10 | maxQuantity |
      | Testuser  | WebdriverIO | 6576756756 | 10 +               | 999         |