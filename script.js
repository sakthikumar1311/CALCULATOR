const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operatorSet = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operatorSet = false;
            updateDisplay('0');
            return;
        }

        if (value === '=') {
            try {
                // Evaluate the expression safely
                const result = eval(currentInput);
                updateDisplay(result);
                currentInput = result.toString();
                operatorSet = false;
            } catch (e) {
                updateDisplay('Error');
                currentInput = '';
                operatorSet = false;
            }
            return;
        }

        if (isOperator(value)) {
            if (currentInput === '') {
                // Prevent operator as first input except minus for negative numbers
                if (value === '-') {
                    currentInput += value;
                    updateDisplay(currentInput);
                }
                return;
            }
            if (operatorSet) {
                // Replace the last operator with the new one
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
                operatorSet = true;
            }
            updateDisplay(currentInput);
            return;
        }

        // If input is a number
        currentInput += value;
        operatorSet = false;
        updateDisplay(currentInput);
    });
});

function updateDisplay(value) {
    display.textContent = value;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}
